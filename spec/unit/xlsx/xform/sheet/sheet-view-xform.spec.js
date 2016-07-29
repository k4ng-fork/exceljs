'use strict';

var SheetViewXform = require('../../../../../lib/xlsx/xform/sheet/sheet-view-xform');
var ListXform = require('../../../../../lib/xlsx/xform/list-xform');
var testXformHelper = require('./../test-xform-helper');


var expectations = [
  {
    title: 'Normal',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4'},
    xml:  '<sheetView tabSelected="1" workbookViewId="0">' +
            '<selection activeCell="G4" sqref="G4"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Normal Zoom',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', zoomScale: 60, zoomScaleNormal: 80},
    xml:  '<sheetView tabSelected="1" workbookViewId="0" zoomScale="60" zoomScaleNormal="80">' +
            '<selection activeCell="G4" sqref="G4"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 60, zoomScaleNormal: 80},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Normal unruly noliney nohdr',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: false, showGridlines: false, showRowColHeaders: false},
    xml:  '<sheetView tabSelected="1" workbookViewId="0" showRuler="0" showGridlines="0" showRowColHeaders="0">' +
            '<selection activeCell="G4" sqref="G4"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: false, showGridlines: false, showRowColHeaders: false, zoomScale: 100, zoomScaleNormal: 100},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Page Break Preview',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', style: 'pageBreakPreview'},
    xml:  '<sheetView tabSelected="1" workbookViewId="0" view="pageBreakPreview">' +
            '<selection activeCell="G4" sqref="G4"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100, style: 'pageBreakPreview'},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Split',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'split', xSplit: 1234, ySplit: 3456, topLeftCell: 'C3', activeCell: 'B1', activePane: 'bottomRight'},
    xml:  '<sheetView tabSelected="1" workbookViewId="0">' +
            '<pane xSplit="1234" ySplit="3456" topLeftCell="C3" activePane="bottomRight"/>' +
            '<selection pane="bottomRight" activeCell="B1" sqref="B1"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'split', xSplit: 1234, ySplit: 3456, topLeftCell: 'C3', activeCell: 'B1', activePane: 'bottomRight', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Split Top Left',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'split', xSplit: 1234, ySplit: 3456, topLeftCell: 'C3', activeCell: 'A1', activePane: 'topLeft'},
    xml:  '<sheetView tabSelected="1" workbookViewId="0">' +
            '<pane xSplit="1234" ySplit="3456" topLeftCell="C3"/>' +
            '<selection activeCell="A1" sqref="A1"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'split', xSplit: 1234, ySplit: 3456, topLeftCell: 'C3', activeCell: 'A1', activePane: 'topLeft', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Frozen',
    create:  function() { return new SheetViewXform()},
    preparedModel: {workbookViewId: 0, state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'C4', activeCell: 'D5'},
    xml:  '<sheetView tabSelected="1" workbookViewId="0">' +
            '<pane xSplit="2" ySplit="3" topLeftCell="C4" activePane="bottomRight" state="frozen"/>' +
            '<selection pane="bottomRight" activeCell="D5" sqref="D5"/>' +
          '</sheetView>',
    parsedModel: {workbookViewId: 0, state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'C4', activeCell: 'D5', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100},
    tests: ['render', 'renderIn', 'parse']
  },
  {
    title: 'Undefined',
    create:  function() { return new SheetViewXform()},
    xml:  '<sheetView workbookViewId="0" />',
    parsedModel: undefined,
    tests: ['parse']
  },
  {
    title: 'List',
    create:  function() { return new ListXform({tag: 'sheetViews', count: false, childXform: new SheetViewXform()}) },
    preparedModel: [
      {workbookViewId: 0, state: 'normal', activeCell: 'G4'},
      {workbookViewId: 1, state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'C4', activeCell: 'D5'}
    ],
    xml:  '<sheetViews>' +
            '<sheetView tabSelected="1" workbookViewId="0">' +
              '<selection activeCell="G4" sqref="G4"/>' +
            '</sheetView>' +
            '<sheetView tabSelected="1" workbookViewId="1">' +
              '<pane xSplit="2" ySplit="3" topLeftCell="C4" activePane="bottomRight" state="frozen"/>' +
              '<selection pane="bottomRight" activeCell="D5" sqref="D5"/>' +
            '</sheetView>'  +
          '</sheetViews>',
    parsedModel: [
      {workbookViewId: 0, state: 'normal', activeCell: 'G4', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100},
      {workbookViewId: 1, state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'C4', activeCell: 'D5', showRuler: true, showGridlines: true, showRowColHeaders: true, zoomScale: 100, zoomScaleNormal: 100}
    ],
    tests: ['render', 'renderIn', 'parse']
  }
];

describe('SheetViewXform', function () {
  testXformHelper(expectations);
});
