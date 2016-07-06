using FSRSurveys.API.Models;
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

        [HttpPost]
        [Route("save")]
        public void Save([FromBody]string value)
        {
            using (var UoW = new SurveyDataContext())
            {
               
            }
        }

       
    }
}
