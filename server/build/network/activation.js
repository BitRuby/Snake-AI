"use strict";
exports.__esModule = true;
var config_constants_1 = require("../config.constants");
var utilis_1 = require("../utilis");
exports.activation = function (value, flag) {
    switch (config_constants_1.NETWORK.ACTIVATION_FUNCTION) {
        case 'relu':
            return utilis_1.relu(value);
        case 'sigmoid':
            return utilis_1.sigmoid(value);
        case 'combine':
            if (flag) {
                return utilis_1.sigmoid(value);
            }
            else {
                return utilis_1.relu(value);
            }
        default:
            return utilis_1.sigmoid(value);
    }
};
