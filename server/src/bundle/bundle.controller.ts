import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { BundleService } from './bundle.service';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('items') // Changed from 'bundle' to 'items' to match plan
export class BundleController {
  constructor(private readonly bundleService: BundleService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body() createBundleDto: CreateBundleDto) {
    return this.bundleService.create(req.user.userId, createBundleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.bundleService.findAll(req.user.userId);
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.bundleService.search(keyword);
  }

  // Public user bundles
  @Get('user/:userId')
  findPublicByUser(@Param('userId') userId: string) {
    return this.bundleService.findPublicByUser(+userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req, @Param('id') id: string) {
    return this.bundleService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Param('id') id: string, @Body() updateBundleDto: UpdateBundleDto) {
    return this.bundleService.update(+id, req.user.userId, updateBundleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req, @Param('id') id: string) {
    return this.bundleService.remove(+id, req.user.userId);
  }
}
