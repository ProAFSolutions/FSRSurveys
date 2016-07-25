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
        [Route("check/{email}")]
        public IHttpActionResult CheckEmail(string email)
        {
            return Ok(_surveyService.CheckIfUserExists(email));
        }


        [HttpGet]
        [Route("questionnaire-data/{email}")]
        public IHttpActionResult RequestUserData(string email)
        {
            var userinfo = _surveyService.GetUserInfo(email);
            var result = new QuestionnaireDataJson();

            if (userinfo != null) {

                if (userinfo is ManagerInfo)
                    result.managerInfo = new ManagerInfoJson((ManagerInfo)userinfo);

                else if (userinfo is AdminInfo)
                    result.adminInfo = new AdminInfoJson((AdminInfo)userinfo);

                else
                    result.assistantInfo = new AssistantInfoJson((AssistantInfo)userinfo);

                result.items = new List<QuestionnaireItemJson>();
                foreach (var SA in userinfo.SurveyAnswers)
                {

                    result.items.Add(new QuestionnaireItemJson
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
            }

            return Ok(result);
        }

        [HttpOptions, HttpPost]
        [Route("save")]
        public IHttpActionResult Save(QuestionnaireDataJson data)
        {
            if (data != null)
            {                
                UserInfo userInfo;
                if (data.managerInfo != null)                
                    userInfo = data.managerInfo.ToManagerInfo();
                
                else if (data.adminInfo != null)                
                    userInfo = data.adminInfo.ToAdminInfo();
                
                else
                    userInfo = data.assistantInfo.ToAssistantInfo();
                                
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

                try
                {
                    _surveyService.SaveSurvey(userInfo);
                }
                catch (Exception ex) {
                    return Ok("Error: " + ex.Message  + " -> " + ex.StackTrace);
                }

                return Ok("success");
            }

            return Ok("empty");
        }       
    }
}
