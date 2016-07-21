using FSRSurveys.API.Models;
using FSRSurveys.API.Service;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FSRSurveys.API.Controllers
{
    public class ReportController : Controller
    {

        private ISurveyService _surveyService = new SurveyService();

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Login()
        {
            return View();
        }

        // GET: Report
        public ActionResult Report()
        {
            var templateFile = new FileInfo(Server.MapPath("~/Views/Report/FSRSurveyTemplate.xlsx"));
            byte[] result;
            using (var excelDoc = new ExcelPackage(templateFile))
            {
                PopulateManagersWorkSheet(excelDoc.Workbook.Worksheets["MANAGER"]);

                PopulateAdminsOrAssistantWorkSheet(excelDoc.Workbook.Worksheets["ADMIN"], "Property Administrator");

                PopulateAdminsOrAssistantWorkSheet(excelDoc.Workbook.Worksheets["ASSISTANT"], "Assistant Property Manager");

                result = excelDoc.GetAsByteArray();
            }
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "FSRSurveyTemplate.xlsx");
        }


        #region Populate Excel

        private void PopulateManagersWorkSheet(ExcelWorksheet managersWorksheet)
        {              
            var dataSource = _surveyService.GetManagersData();

            var rowIndex = 2;            
            dataSource.ForEach(M =>
            {
                var colIndex = 1;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = "Property Manager";
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.Name;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.Email;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.PropertyType;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.PropertyName;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.MarketName;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.City;               
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.PropertiesTotal;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.UnitsTotal;              
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.TotalNumberBoardMeetingAttendedPerYear;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.RdSupervisorName;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.VpSupervisorName;

                PopulateCommonDataCells(managersWorksheet, M.SurveyAnswers, rowIndex, colIndex);

                rowIndex++;
            });                
        }

        private void PopulateAdminsOrAssistantWorkSheet(ExcelWorksheet worksheet, string type)
        {
            var dataSource = _surveyService.GetAdminsData();

            var rowIndex = 2;
            dataSource.ForEach(A =>
            {
                var colIndex = 1;
                worksheet.Cells[rowIndex, colIndex++].Value = type;
                worksheet.Cells[rowIndex, colIndex++].Value = A.Name;
                worksheet.Cells[rowIndex, colIndex++].Value = A.Email;
                worksheet.Cells[rowIndex, colIndex++].Value = A.PropertyType;
                worksheet.Cells[rowIndex, colIndex++].Value = A.PropertyName;
                worksheet.Cells[rowIndex, colIndex++].Value = A.MarketName;
                worksheet.Cells[rowIndex, colIndex++].Value = A.City;               
                worksheet.Cells[rowIndex, colIndex++].Value = A.PropertiesTotal;
                worksheet.Cells[rowIndex, colIndex++].Value = A.UnitsTotal;
                worksheet.Cells[rowIndex, colIndex++].Value = A.ManagersNumber;
                worksheet.Cells[rowIndex, colIndex++].Value = A.TotalNumberBoardMeetingAttendedPerYear;
                worksheet.Cells[rowIndex, colIndex++].Value = A.SupervisorName;

                PopulateCommonDataCells(worksheet, A.SurveyAnswers, rowIndex, colIndex);

                rowIndex++;
            });
        }


        private void PopulateCommonDataCells(ExcelWorksheet worksheet, IEnumerable<SurveyAnswer> userInfoSurveyAnswers, int rowIndex, int colIndex) {

            for (int fieldNumber = 1; fieldNumber <= 4; fieldNumber++)
            {
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Board Relations", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Board Meetings & Management Reports", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Resident Inquiries", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Move In / Move Out", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Annual Meeting & Elections", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Communications", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Community", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Preventative Maintenance", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Violations", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Arch Mods", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Project Management", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Procurement", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Accounts Payable", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Accounts Receivable", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "General Ledger", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Human Resources", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Commuting", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Emergency", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Corporate", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Other", fieldNumber);

                if (fieldNumber == 1)
                {
                    worksheet.Cells[rowIndex, colIndex++].Value = "100%";
                }
            }
            rowIndex++;
        }

        private string GetFieldValue(IEnumerable<SurveyAnswer> answers, string category, int fieldNumber)
        {
            foreach (var answer in answers)
            {
                if (answer.Category.Name.Equals(category)) {
                    return GetValueByFieldNumber(answer, fieldNumber);
                }
            }
            return string.Empty;
        }

        private string GetValueByFieldNumber(SurveyAnswer answer, int fieldNumber) {
            switch (fieldNumber) {
                case 1: return answer.TimeEffort.ToString();
                case 2: return answer.ActivityOwner;
                case 3: return answer.ActivityPerformed;
                case 4: return answer.Technology;
            }
            return string.Empty;
        }

        #endregion

     
    }

    
}