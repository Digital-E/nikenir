import styled from "styled-components"

let Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;

  font-family: helvetica;
  font-size: 13px;

  @media(max-width: 989px) {
    flex-direction: column;
    padding: 20px;
  }
`
let ColLeft = styled.div`
  display: flex;

  > a {
    margin-right: 20px;
    cursor: pointer;
  }

  @media(max-width: 989px) {
    flex-direction: column;

    > a {
      margin-top: 5px;
    }
  }
`

let ColRight = styled.div`
  @media(max-width: 989px) {
    > span {
      display: inline-block;
      margin-top: 5px;
    }
  }
`



export default function Footer({ data, dataBis }) {

  return (
    <Container> 
      <ColLeft>
        <a href='https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&uxId=com.nike.nikefooter&country=US&language=en&requestType=redirect' target='_blank'>Terms of use</a>
        <a href='https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&uxId=com.nike.nikefooter&country=US&language=en&requestType=redirect' target='_blank'>Nike Privacy Policy</a>
        <a href='https://about.nike.com/en/newsroom/statements/statement-on-forced-labor' target='_blank'>CA Supply Chains Act</a>
      </ColLeft>
      <ColRight>
        <span>© 2023 NIKE, Inc. All Rights Reserved</span>
      </ColRight>
    </Container>
  )
}
