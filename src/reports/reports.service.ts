import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(reportDto);
    return this.reportsRepository.save(report);
  }
}
