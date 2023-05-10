import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Report } from './report.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dto/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Param } from '@nestjs/common/decorators';
import { ApproveReportDto } from './dto/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    
  }
}
