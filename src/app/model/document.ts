export class DocumentModel {
  id?: number = 0;
  date?: string = '';
  observation?: string = '';
  document?: any = {};
  name?: string = '';
  path?: string = '';
  traceabilities?: any[];
  documentState?: string = '';

  constructor() {
  }
}
