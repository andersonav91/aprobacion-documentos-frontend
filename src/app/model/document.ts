import { FlowModel } from "./flow";
import { UserModel } from "./user";

export class DocumentModel {
  id?: number = 0;
  date?: string = '';
  observation?: string = '';
  document?: any = {};
  name?: string = '';
  path?: string = '';
  traceabilities?: any[];
  documentState?: string = '';
  flow?: FlowModel;
  user?: UserModel;

  constructor() {
  }
}
