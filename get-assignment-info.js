//@author: https://github.com/waqidvolli

function getAssignmentInfo(document_root) {
    let assignmentInfo = {};

    //Get course title
    let siteTitle = document_root.getElementsByClassName('siteTitle')[0].innerText;
    if(siteTitle.charAt(siteTitle.length-1) === ':'){
      siteTitle = siteTitle.slice(0,siteTitle.length-1);
    }
    assignmentInfo.course = siteTitle ?  siteTitle : '';
    //Get assignment title and due date
    const iframeDocument = document_root.body.getElementsByTagName('iframe')[0].contentWindow.document;
    const portletBody = iframeDocument.getElementsByClassName('portletBody')[0];
    const itemSummary = portletBody.getElementsByClassName('itemSummary')[0];
    const items = itemSummary.getElementsByTagName('tr');

    for(let i = 0 ; i<items.length;i++){
      const rowType = items[i].getElementsByTagName('th')[0].innerText;
      switch (rowType) {
        case 'Title': assignmentInfo.title = items[i].getElementsByTagName('td')[0].innerText;
          break;
        case 'Due': assignmentInfo.due = items[i].getElementsByTagName('td')[0].innerText;
            break;
      }
    }
    console.log(assignmentInfo)
    return assignmentInfo;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getAssignmentInfo(document)
});
