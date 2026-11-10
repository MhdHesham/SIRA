from __future__ import annotations

from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="SIRA Adaptive Learning AI", version="0.1.0")


class SkillResult(BaseModel):
    skill_id: str
    score: float = Field(ge=0, le=1)
    status: Literal["mastered", "developing", "gap"]


class AnalysisRequest(BaseModel):
    trainee_id: str
    answers: list[dict]
    skills: list[dict]


class Recommendation(BaseModel):
    skill_id: str
    priority: int = Field(ge=1)
    reason: str
    content_ids: list[str] = []


class AnalysisResponse(BaseModel):
    trainee_id: str
    skill_profile: list[SkillResult]
    recommendations: list[Recommendation]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "sira-ai"}


@app.post("/v1/learning-paths/analyze", response_model=AnalysisResponse)
def analyze_learning_path(payload: AnalysisRequest) -> AnalysisResponse:
    """Build a transparent baseline path from question-level results.

    The baseline is intentionally deterministic and explainable. A trained
    model can replace this function later without changing the API contract.
    """
    totals: dict[str, list[float]] = {
        str(skill["id"]): [] for skill in payload.skills
    }
    for answer in payload.answers:
        skill_id = str(answer["skill_id"])
        if skill_id in totals:
            totals[skill_id].append(
                1.0 if bool(answer.get("is_correct")) else 0.0
            )

    profile: list[SkillResult] = []
    recommendations: list[Recommendation] = []
    for skill in payload.skills:
        skill_id = str(skill["id"])
        values = totals[skill_id]
        score = sum(values) / len(values) if values else 0.0
        status = "mastered" if score >= 0.8 else "developing" if score >= 0.5 else "gap"
        profile.append(SkillResult(skill_id=skill_id, score=score, status=status))
        if status != "mastered":
            recommendations.append(
                Recommendation(
                    skill_id=skill_id,
                    priority=1 if status == "gap" else 2,
                    reason=(
                        "مراجعة أساسية مطلوبة بسبب انخفاض نتيجة التقييم."
                        if status == "gap"
                        else "تدريب إضافي مقترح لتثبيت المهارة."
                    ),
                    content_ids=[str(item) for item in skill.get("content_ids", [])],
                )
            )

    return AnalysisResponse(
        trainee_id=payload.trainee_id,
        skill_profile=profile,
        recommendations=sorted(recommendations, key=lambda item: item.priority),
    )
