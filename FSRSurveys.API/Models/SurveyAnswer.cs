//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FSRSurveys.API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class SurveyAnswer
    {
        public int Id { get; set; }
        public System.DateTime Date { get; set; }
        public Nullable<decimal> TimeEffort { get; set; }
        public string ActivityOwner { get; set; }
        public string ActivityPerformed { get; set; }
        public string Technology { get; set; }
        public int Category_Id { get; set; }
        public int UserInfo_Id { get; set; }
    
        public virtual UserInfo UserInfo { get; set; }
        public virtual Category Category { get; set; }
    }
}
