import styled from "styled-components";

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;

  aside {
    display: flex;
    flex-direction: column;
    width: 18%;
    justify-content: space-between;

    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 400px;
      overflow-y: auto;
    }

    div {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 5px;

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

   > div {
    background-color: #a3a3a3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    ul {
      padding: 0 6px;
      list-style-type: none;

      li {
        width: 100%;

        p {
          padding: 10px;
          border-radius: 5px;
          display: inline-block;
          width: 45%;
        }
      }

      li.user {
        text-align: left;

        p {
          background-color: red;
          color: white;
        }
      }

      li.me {
        text-align: right;

        p {
          background-color: white;
          color: black;
        }
      }
    }
  }
`;

export default MainContainer;
