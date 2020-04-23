Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

const PUBLIC_URL = 'https://www.shapertools.com/en-us/'

const HEADERLINKSDICT = {
    'hub': '#root > header > div > ul.navbar__NavbarContainerDesktop-jiexzp-3.eKnRtJ > li:nth-child(1) > a',
    'community': '#root > header > div > ul.navbar__NavbarContainerDesktop-jiexzp-3.eKnRtJ > li:nth-child(2) > a',
    'store': '#root > header > div > ul.navbar__NavbarContainerDesktop-jiexzp-3.eKnRtJ > li:nth-child(3) > a',
    'tutorials': '#root > header > div > ul.navbar__NavbarContainerDesktop-jiexzp-3.eKnRtJ > li:nth-child(4) > a', 

}

const COPYRIGHT_FOOTER = 'Shaper Tools, inc. all rights reserved'

beforeEach(() => {
  cy.visit(PUBLIC_URL)
})

function selectElementAndVisit(elementPath) {
    cy.get(elementPath).should('be.visible').and('have.attr', 'href').then(href => {
    cy.get(elementPath).click()
    cy.url().contains(elementPath)
    })
}

describe('Launch Shaper tools  hompage', () => {

    const header_logo = '#root > header > div > a > svg.icons__IconLogo-sc-1tmx9b1-2.header__IconLogoStyled-gy0a5i-1.jxPNmX'
    const footer_logo = '#root > footer > div > div > div.footer__DominoCountryContainerStyled-sc-545slg-4.eLhaTF > svg' 

    it('visits the Shaper Tools website', () => {
        cy.get(header_logo).should('be.visible')
        cy.get(footer_logo).should('be.visible')
        cy.contains(COPYRIGHT_FOOTER).should('be.visible')
        //cy.screenshot() //could be used for screen comparison if desired
    })
})

describe('Check existence of links buttons on the header and visit link', () => {
    it('should make sure visible header buttons exist and links be visited', () => {
      for (const key in HEADERLINKSDICT) {
        cy.get(HEADERLINKSDICT[key]).should('be.visible').click()
        cy.url().should('include', key)
        cy.visit(PUBLIC_URL)
        //cy.screenshot() //could be used for screen comparison if desired
      }
   })
})

describe('Show login form', () => {
    const login = '#root > header > div > ul.actionButtons__ActionButtons-sc-1b3egpe-0.beZqfD > li.authentication__LoginButton-sc-13js91g-0.cIliCv > button'
    const sign_in_modal = 'body > div:nth-child(14) > div > div'
    it('should go launch a login modal popup form', () => {
        cy.get(login).click()
        cy.get(sign_in_modal).contains('Sign In')
        //cy.screenshot() //could be used for screen comparison if desired
    })
})

describe('Login with bad credentials', () => {
    const login = '#root > header > div > ul.actionButtons__ActionButtons-sc-1b3egpe-0.beZqfD > li.authentication__LoginButton-sc-13js91g-0.cIliCv > button'
    const sign_in_modal = 'body > div:nth-child(14) > div > div'
    const username_text_field = '.textInputStyled__TextInputSingleLineStyled-qer98u-0 > .wrapper > input'
    const password_text_field = ':nth-child(3) > .singleLine__TextInputStyled-sc-1t3pv8j-0 > .wrapper > input'
    const fake_username = 'fakeuser@gmail.com'
    const fake_password = 'fakePW1234'
    const error_msg_path = '.common__Message-sc-4aeui8-0'
    const error_msg = 'Your email or password is incorrect'
    const submit = '.verticallyCenteredFlexContainer__VerticallyCenteredFlexContainer-sc-11iru44-0 > .colored'
    
    it('should go launch a login modal popup form and provide an appropriate error message', () => {
        cy.get(login).click()
        cy.get(sign_in_modal).contains('Sign In')
        cy.get(username_text_field).type(fake_username) 
        cy.get(password_text_field).type(fake_password)
        cy.get(submit).click()
        cy.get(error_msg_path).contains(error_msg)
        //cy.screenshot() //could be used for screen comparison if desired
    })
})

describe('Direct user to Shaper tools store', () => {
    const buy_origin_btn = '.buttonBuyOrigin__ButtonBuyOrigin - sc - 1cy2eis-0 > a > .colored'

    it('should visit the shaper tools store when user clicks the Buy Origin button', () => {
        cy.get('.buttonBuyOrigin__ButtonBuyOrigin-sc-1cy2eis-0 > a > .colored').click()
        cy.get('.pricingContainer').contains('$2,499')
    })
})

describe('Visit ShaperHub and view all projects', () => {
    const view_all_projects_btn = '.dqPKFq > a > .colored > .content'
    it('should display the main hero article and be accessible', () => {
        cy.get(HEADERLINKSDICT['hub']).click()  
        cy.get(view_all_projects_btn, { force: true }).click()
        //cy.screenshot() //could be used for screen comparison if desired
    })
})

describe('Scroll to bottom of page', () => {
    it('should allow user to scroll to the bottom of the homepage', () => {
        cy.scrollTo('bottom')
        cy.contains(COPYRIGHT_FOOTER).should('be.visible')
        //cy.screenshot() //could be used for screen comparison if desired
    })
})

describe('Explore filtered projects by submitting a query', () => {
    const view_all_projects_btn = '.dqPKFq > a > .colored > .content'
    const hub_header_container = '.fullWidthContainer__FullWidthContainer-dskl07-0 > .active'
    const search_field = 'form > .singleLine__TextInputStyled-sc-1t3pv8j-0 > .wrapper > input'
    const submit_search = '.search__IconSearchBlue-sc-1wlm1a9-0'
    const query_term = 'walnut'
    
    it('should bring user to the explore tab of ShaperHub and then query for projects matching a keyword', () => {
        //const hub_url = 'https://hub.shapertools.com/search'
        //cy.visit(hub_url)
        cy.get(HEADERLINKSDICT['hub']).click()
        cy.get(view_all_projects_btn, { force: true }).click()
        cy.get(hub_header_container).should('be.visible')
        cy.get(search_field, { force: true}).type(query_term)
        cy.get(submit_search, { force: true }).click()
        cy.url().should('include', query_term)

        //cy.screenshot() //could be used for screen comparison if desired
    })
})


describe('Query for nonsensical projects, input validation tests', () =>{
    const hub_base_url = 'https://hub.shapertools.com/search?search='
    const bad_query_terms_dict = {
        'long_string' : 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm', 
        'all_numbers' : '0123456789',
        'special_chars' : '/.,][;\=-)(*&^%$#@!``)',
        'sql_injection': 'SELECT * FROM Users WHERE Name ="" or ""="" AND Pass ="" or ""=""',
        'combo' : 'qwerty123456'
    }
    const no_results_found = '.noResultsFound__NoResultsFoundUnconnected-sc-8q61uq-0 > svg'
    it('should reveal a new element with all teams in that league', () => {
        for (const key in bad_query_terms_dict){
            cy.visit(hub_base_url + bad_query_terms_dict[key])
            cy.get(no_results_found).should('be.visible')
            //could be used for screen comparison if desired
        }
    })  
})


