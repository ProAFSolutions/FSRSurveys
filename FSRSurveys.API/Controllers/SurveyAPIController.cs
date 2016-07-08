using FSRSurveys.API.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;



namespace FSRSurveys.API.Controllers
{
    [RoutePrefix("api/survey")]
    public class SurveyAPIController : ApiController
    {

        private ISurveyService _surveyService = new SurveyService();


        [HttpGet]
        [Route("categories")]
        public IHttpActionResult RequestCategories()
        {
            var result = _surveyService.GetCategories().Select(C => new
            {
                id = C.Id,
                name = C.Name,
                jobActivity = C.JobActivity
            }).ToList();

            return Ok(result);
        }

        [HttpGet]
        [Route("markets")]
        public IHttpActionResult RequestMarkets()
        {
            var result = _surveyService.GetMarkets().Select(M => new
            {
                name = M.marketName
            });

            return Ok(result);
        }

        [HttpPost]
        [Route("save")]
        public void Save([FromBody]string value)
        {
           
        }

       
    }
}
