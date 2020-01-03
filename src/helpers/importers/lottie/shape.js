import sendCommand from './commandHelper'
import processTransform from './transform'
import {getFrameRate} from './frameRateHelper'
import random from '../../randomGenerator'
import processProperty from './property'

const groupHandler = (data, parentId) => {
	const groupId = random(10);
	sendCommand('createShapeGroup', [groupId, parentId]);
	iterateShapes(data.it, groupId); // eslint-disable-line no-use-before-define
}

const transformHandler = (data, parentId) => {
	processTransform(data, parentId);
}

const rectangleHandler = (data, parentId) => {
	const rectId = random(10);
	sendCommand('createRectangle', [rectId, parentId]);
	processProperty('Size', data.s, rectId, [100, 100]);
	processProperty('Position', data.p, rectId, [0, 0]);
	processProperty('Roundness', data.r, rectId, 0);
}

const fillHandler = (data, parentId) => {
	const id = random(10);
	sendCommand('createFill', [id, parentId]);
	processProperty('Color', data.c, id);
	processProperty('Opacity', data.o, id, 100);
	processProperty('Fill Rule', data.r, id);
	// TODO: Blend mode
}

const strokeHandler = (data, parentId) => {
	const id = random(10);
	sendCommand('createStroke', [id, parentId]);
	processProperty('Color', data.c, id);
	processProperty('Opacity', data.o, id, 100);
	processProperty('Stroke Width', data.w, id, 1);
	processProperty('Line Cap', data.lc, id, 1);
	processProperty('Line Join', data.lj, id, 1);
	if (data.lj === 1) {
		processProperty('Miter Limit', data.ml, id, 4);
	}
}

const ellipseHandler = (data, parentId) => {
	const id = random(10);
	sendCommand('createEllipse', [id, parentId]);
	processProperty('Shape Direction', data.d, id);
	processProperty('Size', data.s, id, [100, 100]);
	processProperty('Position', data.p, id, [0, 0]);
}

const starHandler = (data, parentId) => {
	const id = random(10);
	sendCommand('createStar', [id, parentId]);
	processProperty('Type', data.sy, id, 1);
	processProperty('Shape Direction', data.d, id, 1);
	processProperty('Points', data.pt, id, 5);
	processProperty('Position', data.p, id, [0, 0]);
	processProperty('Rotation', data.r, id, 0);
	if (data.sy === 1) {
		processProperty('Inner Radius', data.ir, id, 50);
		processProperty('Inner Roundness', data.is, id, 0);
	}
	processProperty('Outer Radius', data.or, id, 100);
	processProperty('Outer Roundness', data.os, id, 0);
	processProperty('name', data.nm, id);
	console.log(data)
	
}

const shapeHandler = (data, parentId) => {
	const id = random(10);
	sendCommand('createShape', [id, parentId]);
	// const pathId = random(10);
	// sendCommand('assignIdToProp', ['ADBE Vector Shape', pathId, id]);
	// sendCommand('createShapePath', [pathId]);
	processProperty('ADBE Vector Shape', data.ks, id, null);
	// TODO: Blend mode
}

const shapeHandlers = {
	gr: groupHandler,
	rc: rectangleHandler,
	fl: fillHandler,
	tr: transformHandler,
	sh: shapeHandler,
	st: strokeHandler,
	el: ellipseHandler,
	sr: starHandler,
}
const iterateShapes = (shapes, parentId) => {
	shapes.forEach(shape => {
		if (shapeHandlers[shape.ty]) {
			shapeHandlers[shape.ty](shape, parentId)
		} else {
			console.log('TYPE NOT HANDLED: ', shape.ty);
		}
	})
}

const processShape = (layerData, layerId) => {
	iterateShapes(layerData.shapes, layerId)
}

export default processShape