
interface JqueryBrowser {

    name?: string;
    platform?: string;
    version?: string;
    verisonNumber?: number;
    desktop?: boolean;
       
}


interface JQueryStatic {
    browser: JqueryBrowser;
}