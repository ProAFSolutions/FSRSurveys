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
    
    public partial class UserInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UserInfo()
        {
            this.SurveyAnswers = new HashSet<SurveyAnswer>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PropertyType { get; set; }
        public string PropertyName { get; set; }
        public string MarketName { get; set; }
        public int UnitsTotal { get; set; }
        public int PropertiesTotal { get; set; }
        public int TotalNumberBoardMeetingAttendedPerYear { get; set; }
        public string City { get; set; }
        public string RecoveryPassword { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SurveyAnswer> SurveyAnswers { get; set; }
    }
}
