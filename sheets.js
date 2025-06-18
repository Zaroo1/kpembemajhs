const SHEET_NAME = "JHS_Results";

function doPost(e) {
  try {
    const { class: className, fullName, dob } = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (
        row[0].toString().trim().toLowerCase() === className.trim().toLowerCase() &&
        row[1].toString().trim().toLowerCase() === fullName.trim().toLowerCase() &&
        row[2].toString().trim() === dob.trim()
      ) {
        const result = {
          status: "success",
          class: row[0],
          fullName: row[1],
          dob: row[2],
          subjects: {
            Mathematics: row[3],
            English: row[4],
            Science: row[5],
            Social_Studies: row[6]
          

},
          total: row[7],
          position: row[8]
        };
        return ContentService.createTextOutput(JSON.stringify(result))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // If no match found
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "No result found for provided details"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}