export default class MatchingManageView {
  renderPage = (container) => {
    const template = `
    <main>
      <section>
        <h3>팀 매칭을 관리할 코스, 미션을 선택하세요.</h3>
        <form>
          <select id="course-select">
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
          </select>
          <select id="mission-select">
            <option value="baseball">숫자야구게임</option>
            <option value="racingcar">자동차경주</option>
            <option value="lotto">로또</option>
            <option value="shopping-cart">장바구니</option>
            <option value="payments">결제</option>
            <option value="subway">지하철노선도</option>
            <option value="performance">성능개선</option>
            <option value="deploy">배포</option>
          </select>
          <button id="show-team-matcher-button">확인</button>
        </form>
      </section>
      <section id="matching-section"></section>
    </main>
    `;
    container.insertAdjacentHTML("beforeend", template);
  };

  renderMatchingPage = (course, mission, container) => {
    const template = `
      <section>
      <h3>${course} ${mission} 미션의 팀 매칭</h3>
      <div>
        <div>
          <p>아직 매칭된 팀이 없습니다. 팀을 매칭하겠습니까?</p>
          <form>
            <label>1팀당 인원 수</label>
            <input type="number" id="team-member-count-input"/>
            <button id="match-team-button">팀 매칭</button>
          </form>
        </div>
        <h4>크루 목록</h4>
        <ul id="crew-list">
        </ul>
      </div>
    </section>
    `;
    container.innerHTML = "";
    container.innerHTML = template;
  };

  renderMatchingResult = (container) => {
    const template = `
      <section>
      <h3>프론트엔드 숫자야구게임 조회</h3>
      <p>팀이 매칭되었습니다.</p>
      <ul id="team-match-result">
      </ul>
      <p>
        팀을 재매칭 하시겠습니까?
        <button>재매칭</button>
      </p>
    </section>
    `;

    container.insertAdjacentHTML("beforeend", template);
  };

  renderMatchingCrewList = (shuffledCrews, container) => {
    const resultTemplate = shuffledCrews
      .map((crews) => {
        return `<li>${crews.join(",")}</li>`;
      })
      .join("");

    container.innerHTML = resultTemplate;
  };

  renderAllCrewList = (crews, container) => {
    const template = crews.map((crew) => `<li>${crew}</li>`).join("");
    container.innerHTML = template;
  };
}
