import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

import json from "highlight.js/lib/languages/json";
import { FormsLlamada } from '../../pages/models/form0800covid2';


const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root",
})
export class ExporterService {

  public form : FormsLlamada [] = [];


  constructor(private http: HttpClient, private router: Router) {}

  public exportAsExcelFile(json:any, excelFileName: string): void {
    //console.log("Exporter", json);
 
      
     //console.log (as);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json
    );

    //console.log("worksheet", worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_BD_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}

/* public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		//console.log("worksheet", worksheet);
		const workbook: XLSX.WorkBook = {
			Sheets: { data: worksheet },
			SheetNames: ["data"],
		};
		const excelBuffer: any = XLSX.write(workbook, {
			bookType: "xlsx",
			type: "array",
		});
		//const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}

	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {
			type: EXCEL_TYPE,
		});
		FileSaver.saveAs(
			data,
			fileName + "_BD_" + new Date().getTime() + EXCEL_EXTENSION
		);
	} */
