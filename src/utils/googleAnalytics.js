
export default class GoogleAnalytics {
    /**
     * @constructor
     */
    constructor() {
        if (localStorage.userDetails) {
            let userRoles = localStorage.userDetails && JSON.parse(localStorage.userDetails).role
            this.src = userRoles.includes("Company") || userRoles.includes("Branch")
                ? "https://www.googletagmanager.com/gtag/js?id=G-DHDSK7K4G5"
                : userRoles.includes("Customer")
                    ? "https://www.googletagmanager.com/gtag/js?id=G-L7P574QRC9"
                    : null

            this.src && this.setScript()
        }
    }
    setScript() {
        const gaScript = document.createElement("script")
        gaScript.setAttribute("async", true)
        gaScript.setAttribute("src", this.src)
        document.head.prepend(gaScript)
        gaScript.src = this.src
        console.log(document.head)
    }
 }


