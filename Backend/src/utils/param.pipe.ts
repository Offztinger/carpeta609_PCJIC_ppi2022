import { Injectable, PipeTransform } from "@nestjs/common";
import { UndefinedException } from "./exceptions/UndefinedException";

@Injectable()
export class ParamPipe implements PipeTransform {

    async transform(value: any) {
        if (value.id) {
            throw new UndefinedException();
        }

        return value;
    }
}

