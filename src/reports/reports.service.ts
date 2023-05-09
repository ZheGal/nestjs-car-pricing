import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportsRepository.create(reportDto);
    report.user = user;
    return this.reportsRepository.save(report);
  }
}
