import { NETWORK } from "../config.constants";
import { relu, sigmoid } from "../utilis";

export const activation = (value: any, flag?: boolean): number => {
    switch (NETWORK.ACTIVATION_FUNCTION) {
        case 'relu':
            return relu(value);
        case 'sigmoid':
            return sigmoid(value);
        case 'combine':
            if (flag) {
                return sigmoid(value);
            }
            else {
                return relu(value);
            }
        default:
            return sigmoid(value);
    }
}