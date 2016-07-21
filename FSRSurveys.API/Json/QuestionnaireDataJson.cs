using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FSRSurveys.API.Json
{

    public class QuestionnaireDataJson {

        public ManagerInfoJson managerInfo { get; set; }

        public AdminInfoJson adminInfo { get; set; }

        public AssistantInfoJson assistantInfo { get; set; }

        private List<QuestionnaireItemJson> _items = new List<QuestionnaireItemJson>();

        public List<QuestionnaireItemJson> items
        {
            get
            {
                return _items;
            }

            set
            {
                _items = value;
            }
        }
    }   

    public class QuestionnaireItemJson
    {
        public CategoryJson category { get; set; }

        public AnswerJson answer { get; set; }
    }
    
}