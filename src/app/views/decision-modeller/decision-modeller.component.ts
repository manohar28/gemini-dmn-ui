import { Component, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit, ViewContainerRef, AfterContentInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Modeler from 'dmn-js/lib/Modeler';
import InteractionLogger from '../extensions/InteractionLogger';

import CustomInputEditingProvider from '../extensions/CustomInputEditingProvider';

const dmnModler = require('dmn-js/dist/dmn-modeler.development');


var overrideModule = {
  InputEditingProvider: ['type', CustomInputEditingProvider]
}

import {
  DmnPropertiesPanelModule,
  DmnPropertiesProviderModule,
  CamundaPropertiesProviderModule
} from 'dmn-js-properties-panel';

@Component({
  selector: 'app-decision-modeller',
  templateUrl: './decision-modeller.component.html',
  styleUrls: ['./decision-modeller.component.scss']
})
export class DecisionModellerComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  private dmnDiagramModeler: Modeler; // DMN Modeller.
  private importDone: EventEmitter<any> = new EventEmitter(); // Fires as soon as  DMN Modeller, importing XML is success.

  @ViewChild('ref', { static: true }) private el: ElementRef | undefined; // host for Decision Diagram

  constructor(private http: HttpClient) {
    this.dmnDiagramModeler = new Modeler({
      container: this.el,
      drd: {
        additionalModules: [
          DmnPropertiesPanelModule,
          DmnPropertiesProviderModule,
          CamundaPropertiesProviderModule,
          CustomInputEditingProvider,
          overrideModule]
      },
    });

    //this.dmnDiagramModeler.register

    this.http.get('../assets/test.dmn', { responseType: 'text' })
      .subscribe((x) => this.dmnDiagramModeler.importXML(x));
  }

  ngAfterViewInit(): void {
    this.dmnDiagramModeler.on('views.changed', (event: any) => {
      console.log('View Changed event got fired.....event = ', event);
    });
  }

  ngOnDestroy(): void {
    this.dmnDiagramModeler.destroy();
  }

  ngAfterContentInit(): void {
    this.dmnDiagramModeler.attachTo(this.el!.nativeElement);
  }

  /**
   * This function is based on `exportDiagram` from the starter example:
   * https://github.com/bpmn-io/dmn-js-examples/blob/master/starter/modeler.html
   */
  exportDiagram() {
    this.dmnDiagramModeler.saveXML({ format: true }, function (err: any, xml: any) {

      if (err) {
        return console.error('Could not save DMN diagram', err);
      }
      alert('Diagram exported to console!');
      console.log('DIAGRAM', xml);
    });

  }

}
