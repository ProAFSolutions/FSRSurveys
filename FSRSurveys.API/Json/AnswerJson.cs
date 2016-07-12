using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Json
{
    public class AnswerJson
    {
        public int timeEffort { get; set; }
        public string activityOwner { get; set; }
        public string activityPerformed{ get; set; }
        public string technology{ get; set; }
    }
}