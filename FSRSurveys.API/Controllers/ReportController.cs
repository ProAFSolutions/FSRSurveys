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

        // GET: Report
        public FileStreamResult Report()
        {
            var templateFile = new FileInfo(Server.MapPath("~/Views/Report/FSRSurveyTemplate.xlsx"));
            Stream result = new MemoryStream();
            using (var excelDoc = new ExcelPackage(templateFile))
            {
                PopulateManagersWorkSheet(excelDoc.Workbook.Worksheets["MANAGER"]);

                PopulateAdminsWorkSheet(excelDoc.Workbook.Worksheets["ADMIN"]);

                excelDoc.SaveAs(result);
            }

            return new FileStreamResult(result, "application/ms-excel")
            {
                FileDownloadName = "FSRSurveyReport.xlsx"                
            };
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
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.AssociationsNumber;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.PropertiesTotal;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.UnitsTotal;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.TotalBoardMeetingsHeldPerYear;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.TotalNumberBoardMeetingAttendedPerYear;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.RdSupervisorName;
                managersWorksheet.Cells[rowIndex, colIndex++].Value = M.VpSupervisorName;

                PopulateCommonDataCells(managersWorksheet, M.SurveyAnswers, rowIndex, colIndex);

                rowIndex++;
            });                
        }

        private void PopulateAdminsWorkSheet(ExcelWorksheet adminsWorksheet)
        {
            var dataSource = _surveyService.GetAdminsData();

            var rowIndex = 2;
            dataSource.ForEach(A =>
            {
                var colIndex = 1;

                adminsWorksheet.Cells[rowIndex, colIndex++].Value = "Property Administrator";
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.Name;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.Email;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.PropertyType;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.PropertyName;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.MarketName;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.City;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.AssociationsNumber;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.PropertiesTotal;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.UnitsTotal;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.ManagersNumber;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.TotalNumberBoardMeetingAttendedPerYear;
                adminsWorksheet.Cells[rowIndex, colIndex++].Value = A.SupervisorName;

                PopulateCommonDataCells(adminsWorksheet, A.SurveyAnswers, rowIndex, colIndex);

                rowIndex++;
            });
        }


        private void PopulateCommonDataCells(ExcelWorksheet worksheet, IEnumerable<SurveyAnswer> userInfoSurveyAnswers, int rowIndex, int colIndex) {

            for (int fieldNumber = 1; fieldNumber <= 4; fieldNumber++)
            {
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Board Relations", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Board Meetings & Management Reports", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Resident Inquiries", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Move In/Move Out", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Annual Meeting & Elections", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Communications", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Community", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Preventative Maintenance", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Violations", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Arch Mods", fieldNumber);
                worksheet.Cells[rowIndex, colIndex++].Value = GetFieldValue(userInfoSurveyAnswers, "Project Mgmt", fieldNumber);
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
                case 1: return answer.TimeEffort + "%";
                case 2: return answer.ActivityOwner;
                case 3: return answer.ActivityPerformed;
                case 4: return answer.Technology;
            }
            return string.Empty;
        }

        #endregion

     
    }

    
}