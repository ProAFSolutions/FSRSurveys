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
    
    public partial class Market
    {
        public int marketInstanceMappingID { get; set; }
        public string marketName { get; set; }
        public string c4Uid { get; set; }
        public string applicationInstanceAddress { get; set; }
        public int netTcpPort { get; set; }
        public string notes { get; set; }
        public System.DateTime createdOn { get; set; }
        public string createdBy { get; set; }
        public bool isDebug { get; set; }
    }
}