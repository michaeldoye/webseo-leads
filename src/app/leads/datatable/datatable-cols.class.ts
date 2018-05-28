export class TableCols {
  cols: Array<TableCol> = [
    {id: 'checkbox', name: 'checkbox'},
    {id: 'id', name: 'ID'}, 
    {id: 'companyName', name: 'Company Name'},
    {id: 'personName', name: 'Person Name'}, 
    {id: 'emailAddress', name: 'Email Address'}, 
    {id: 'contactNumber', name: 'Contact Number'}, 
    {id: 'source', name: 'Source'},
    {id: 'currentStatus', name: 'Current Status'},
    {id: 'hasMeeting', name: 'Has Meeting'},
    {id: 'quotedDate', name: 'Quoted Date'},
    {id: 'requestedServices', name: 'Requested Services'},
    {id: 'websiteAddress', name: 'Website Address'},     
    {id: 'leadDate', name: 'Lead Date'}, 
    {id: 'firstContact', name: 'First Contacted'}, 
    {id: 'tags', name: 'Tags'},
    {id: 'actions', name: 'actions'}
  ];
}

export class DefaultCols {
  cols: Array<any> = [
    'checkbox', 
    'id', 
    'companyName', 
    'personName', 
    'emailAddress', 
    'tags', 
    'actions'
  ];
}

export class DefaultTags {
  tags: Array<any> = [
    'dev', 
    'seo', 
    'ppc', 
    'social', 
    'pending', 
    'to contact', 
    'needs info', 
    'is client'
  ]
}

export interface TableCol {
  id: string;
  name: string;
}