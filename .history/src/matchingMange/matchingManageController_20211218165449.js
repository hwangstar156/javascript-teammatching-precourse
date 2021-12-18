import { checkValidCount } from "../utils/validator.js";
import MatchingManageView from "./matchingManageView.js";

export default class matchingManageController {
  constructor(crews) {
    this.view = new MatchingManageView();
    this.crews = crews;
    this.$container = document.getElementById("app");
  }

  init = () => {
    this.initPage();
    this.initDOMS();
    this.setEvent();
  };

  initDOMS = () => {
    this.$courseSelect = document.getElementById("course-select");
    this.$missionSelect = document.getElementById("mission-select");
    this.$selectForm = document.getElementById("course-select").closest("form");
    this.$matchingSection = document.getElementById("matching-section");
  };

  initPage = () => {
    this.view.renderPage(this.$container);
  };

  setEvent = () => {
    this.$selectForm.addEventListener("submit", this.setSelectOptionEvent);
  };

  setSelectOptionEvent = (e) => {
    e.preventDefault();
    const courseText = this.$courseSelect.options[this.$courseSelect.selectedIndex].text;
    const courseValue = this.$courseSelect.options[this.$courseSelect.selectedIndex].value;
    const missionText = this.$missionSelect.options[this.$missionSelect.selectedIndex].text;
    this.view.renderMatchingPage(courseText, missionText, this.$matchingSection);
    const $crewList = document.getElementById("crew-list");
    this.view.renderAllCrewList(this.crews.model.getCrewsById(courseValue), $crewList);
    this.initAfterRenderMatching();
  };

  initAfterRenderMatching = () => {
    this.initDOMSAfterRenderMatching();
    this.setEventAfterRenderMatching();
  };

  initDOMSAfterRenderMatching = () => {
    this.$teamMemverCountInput = document.getElementById("team-member-count-input");
    this.$teamMatchForm = document.getElementById("match-team-button").closest("form");
  };

  setEventAfterRenderMatching = () => {
    this.$teamMatchForm.addEventListener("submit", this.setMatchingMemberEvent);
  };

  setMatchingMemberEvent = (e) => {
    e.preventDefault();
    try {
      const count = Number(this.$teamMemverCountInput.value);
      const courseValue = this.$courseSelect.options[this.$courseSelect.selectedIndex].value;
      const crews = this.crews.model.getCrewsById(courseValue);

      checkValidCount(count); // 예외처리
      this.matchCrews(count, crews);
    } catch (err) {
      alert(err);
    }
  };

  matchCrews = (count, crews) => {
    const crewsAmount = Number(crews.length);
    const crewIndexArray = this.createCrewIndexArray(crewsAmount);
    const shuffledCrewsIdx = MissionUtils.Random.shuffle(crewIndexArray);

    const teamCount = Math.floor(crewsAmount / count);
    const remainingCount = crewsAmount % count;
    const teamMemberClass = this.createTeamMemberClass(count, remainingCount, teamCount);

    const shuffledCrews = this.createSuffledCrews(crews, shuffledCrewsIdx, teamMemberClass);
    this.view.renderMatchingResult(this.$matchingSection);
    const $teamMatchingResult = document.getElementById("team-match-result");
    this.view.renderMatchingCrewList(shuffledCrews, $teamMatchingResult);
  };

  createCrewIndexArray = (crewsAmount) => {
    const arr = new Array(crewsAmount).fill(0);
    return arr.map((elem, idx) => idx);
  };

  createTeamMemberClass = (count, remainingCount, teamCount) => {
    let teamMemberClass = new Array(teamCount).fill(count);
    let remainAmount = remainingCount;
    while (remainAmount > 0) {
      teamMemberClass = teamMemberClass.map((team) => {
        remainAmount -= 1;
        return team + 1;
      });
    }

    return teamMemberClass;
  };

  createSuffledCrews = (crews, shuffledCrewsIdx, teamMemberClass) => {
    const arr = [];
    const crewsIdx = shuffledCrewsIdx;
    teamMemberClass.forEach((team) => {
      arr.push(crewsIdx.splice(0, team).map((idx) => crews[idx]));
    });
    return arr;
  };
}
