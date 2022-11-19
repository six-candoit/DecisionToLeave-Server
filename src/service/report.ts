import { ReportCreateDTO } from './../interface/IReport';
import { reportDAO } from "../dao";
import { sc } from '../constants';

const writePoint = async (reportRequestDTO: ReportCreateDTO) => {
    const reportResponse = await reportDAO.createReport(reportRequestDTO);
    
    if (!reportResponse) {
        return sc.BAD_REQUEST
    }

    return reportResponse;
}

const finishReport = async (userId:number) => {

    const reportData = await reportDAO.findReportByUserId(userId);

    if(!reportData) {
        return sc.BAD_REQUEST;
    }

    return reportData;
}

const reportService = {
    writePoint,
    finishReport
}

export default reportService;