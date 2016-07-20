using FSRSurveys.API.Json;
using FSRSurveys.API.Models;
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

        [HttpGet]
        [Route("questionnaire-data/{email}")]
        public IHttpActionResult RequestUserData(string email)
        {
            var result = _surveyService.GetUserInfo(email);

            if (result != null) {

                var data = new QuestionnaireDataJson(); 

                if (result is ManagerInfo) 
                    data.managerInfo = new ManagerInfoJson((ManagerInfo) result);                    
                else
                    data.adminInfo = new AdminInfoJson((AdminInfo) result);

                data.items = new List<QuestionnaireItemJson>();
                foreach (var SA in result.SurveyAnswers) {

                    data.items.Add(new QuestionnaireItemJson
                    {
                        category = new CategoryJson
                        {
                            id = SA.Category.Id,
                            name = SA.Category.Name,
                            jobActivity = SA.Category.JobActivity
                        },

                        answer = new AnswerJson
                        {
                            timeEffort = (int)SA.TimeEffort,
                            activityOwner = SA.ActivityOwner,
                            activityPerformed = SA.ActivityPerformed,
                            technology = SA.Technology
                        }
                    });
                }
                return Ok(data);
            }

            return Ok("empty");
        }

        [HttpOptions, HttpPost]
        [Route("save")]
        public IHttpActionResult Save(QuestionnaireDataJson data)
        {
            if (data != null)
            {                
                UserInfo userInfo;
                if (data.managerInfo != null)
                {                  
                    userInfo = data.managerInfo.ToManagerInfo();
                }
                else {
                    userInfo = data.adminInfo.ToAdminInfo();
                }
                
                data.items.ForEach(I => {
                    userInfo.SurveyAnswers.Add(new SurveyAnswer
                    {
                        Date = DateTime.Now,
                        TimeEffort = I.answer.timeEffort,
                        ActivityOwner = I.answer.activityOwner,
                        ActivityPerformed = I.answer.activityPerformed,
                        Technology = I.answer.technology,
                        Category = new Category
                        {
                            Id = I.category.id,
                            Name = I.category.name,
                            JobActivity = I.category.jobActivity
                        }
                    });

                });

                _surveyService.SaveSurvey(userInfo);

                return Ok("success");
            }

            return Ok("error");
        }       
    }
}
