using ExcelLibrary.SpreadSheet;
using FSRSurveys.API.Service;
using QiHe.CodeLib;
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

        // GET: Report
        public FileResult SurveyExcelReport()
        {

            var managersDataSource = _surveyService.GetManagersData();
            var managersWorksheet = GetManagersWorksheet();           
            managersDataSource.ForEach(M =>
            {
                for (int rowIndex = managersWorksheet.Cells.FirstRowIndex; rowIndex <= managersWorksheet.Cells.LastRowIndex; rowIndex++)
                {
                    Row row = managersWorksheet.Cells.GetRow(rowIndex);
                    for (int colIndex = row.FirstColIndex; colIndex <= row.LastColIndex; colIndex++)
                    {
                        Cell cell = row.GetCell(colIndex);
                    }
                }               
            });

            var adminsDataSource = _surveyService.GetAdminsData();
            var adminWorksheet = GetAdminWorksheet();    
                     
            Workbook book = new Workbook();
            book.Worksheets.Add(managersWorksheet);
            book.Worksheets.Add(managersWorksheet);

            var stream = new MemoryStream();
            book.SaveToStream(stream);

            return null;
        }

        private Worksheet PopulateWorkseet() {

            var managersDataSource = _surveyService.GetManagersData();
            var managersWorksheet = CreateManagersWorksheet();
            managersDataSource.ForEach(M =>
            {
               
            });

            return managersWorksheet;
        }


        #region Worksheets Structure

            private List<Cell> ManagerWorkSheetHeader {
                get {
                    var dataHeader = new List<Cell>();
                    dataHeader.Add(new Cell("ASSOCIATE TYPE"));
                    dataHeader.Add(new Cell("MANAGER NAME"));
                    dataHeader.Add(new Cell("MANAGER EMAIL"));
                    dataHeader.Add(new Cell("PROPERTY TYPE MANAGED"));
                    dataHeader.Add(new Cell("PROPERTY NAME"));
                    dataHeader.Add(new Cell("MARKET"));
                    dataHeader.Add(new Cell("CITY"));
                    dataHeader.Add(new Cell("TOTAL # OF ASSOCIATIONS MANAGED"));
                    dataHeader.Add(new Cell("TOTAL # OF BOARD MEETINGS ATTENDED"));
                    dataHeader.Add(new Cell("TOTAL # OF BOARD MEETING HELD PER YEAR"));
                    dataHeader.Add(new Cell("RD SUPERVISOR NAME"));
                    dataHeader.Add(new Cell("VP SUPERVISOR NAME"));

                    PopulateDataHeaders(dataHeader);

                     return dataHeader;
                }
            }

            private List<Cell> AdminWorkSheetHeader
            {
                get
                  {
                    var dataHeader = new List<Cell>();
                    dataHeader.Add(new Cell("ASSOCIATE TYPE"));
                    dataHeader.Add(new Cell("ADMINISTRATOR NAME"));
                    dataHeader.Add(new Cell("ADMINISTRATOR EMAIL"));
                    dataHeader.Add(new Cell("PROPERTY TYPE SUPPORTED"));
                    dataHeader.Add(new Cell("MARKET"));
                    dataHeader.Add(new Cell("CITY"));
                    dataHeader.Add(new Cell("TOTAL # OF ASSOCIATIONS SUPPORTED"));
                    dataHeader.Add(new Cell("TOTAL # OF UNITS SUPPORTED"));
                    dataHeader.Add(new Cell("TOTAL # OF MANAGERS SUPPORTED"));
                    dataHeader.Add(new Cell("TOTAL # OF BOARD MEETINGS ATTENDED"));
                    dataHeader.Add(new Cell("SUPERVISOR NAME"));

                    PopulateDataHeaders(dataHeader);

                     return dataHeader;
                }
            }

            private Worksheet CreateManagersWorksheet()
            {
                var managersWorksheet = new Worksheet("Property Manager");
                for (int col = 0; col < ManagerWorkSheetHeader.Count; col++)
                {
                    managersWorksheet.Cells[0, col + 1] = ManagerWorkSheetHeader[col];
                }
                return managersWorksheet;
            }

            private Worksheet CreateAdminWorksheet()
            {
                var adminWorksheet = new Worksheet("Property Administrator");
                for (int col = 0; col < AdminWorkSheetHeader.Count; col++)
                {
                    adminWorksheet.Cells[0, col + 1] = AdminWorkSheetHeader[col];
                }
                return adminWorksheet;
            }


            private void PopulateDataHeaders(List<Cell> dataHeader)
            {
                for (int i = 1; i < 5; i++)
                {
                    dataHeader.Add(new Cell("BOARD RELATIONS " + i));
                    dataHeader.Add(new Cell("BOARD MEETINGS & MANAGEMENT REPORTS " + i));
                    dataHeader.Add(new Cell("RESIDENT INQUIRIES " + i));
                    dataHeader.Add(new Cell("MOVE IN/MOVE OUT " + i));
                    dataHeader.Add(new Cell("ANNUAL MEETING & ELECTIONS " + i));
                    dataHeader.Add(new Cell("COMMUNICATIONS " + i));
                    dataHeader.Add(new Cell("COMMUNITY " + i));
                    dataHeader.Add(new Cell("PREVENTATIVE MAINTENANCE " + i));
                    dataHeader.Add(new Cell("VIOLATIONS " + i));
                    dataHeader.Add(new Cell("ARCH MODS " + i));
                    dataHeader.Add(new Cell("PROJECT MANAGEMENT " + i));
                    dataHeader.Add(new Cell("PROCUREMENT " + i));
                    dataHeader.Add(new Cell("ACCOUNTS PAYABLE " + i));
                    dataHeader.Add(new Cell("ACCOUNTS RECEIVABLE " + i));
                    dataHeader.Add(new Cell("GENERAL LEDGER " + i));
                    dataHeader.Add(new Cell("HUMAN RESOURCES " + i));
                    dataHeader.Add(new Cell("COMMUTING " + i));
                    dataHeader.Add(new Cell("EMERGENCY " + i));
                    dataHeader.Add(new Cell("CORPORATE " + i));
                    dataHeader.Add(new Cell("OTHER " + i));

                    if (i == 1)
                        dataHeader.Add(new Cell("TOTAL 1"));
                }
            }
        #endregion
    }
}