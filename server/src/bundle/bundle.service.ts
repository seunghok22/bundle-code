import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateBundleDto } from './dto/create-bundle.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';
import { Bundle } from './entities/bundle.entity';

@Injectable()
export class BundleService {
  constructor(
    @InjectRepository(Bundle)
    private bundleRepository: Repository<Bundle>,
  ) { }

  create(userId: number, createBundleDto: CreateBundleDto) {
    const bundle = this.bundleRepository.create({
      ...createBundleDto,
      user_id: userId,
    });
    return this.bundleRepository.save(bundle);
  }

  findAll(userId: number) {
    return this.bundleRepository.find({ where: { user_id: userId } });
  }

  async findOne(id: number, userId: number) {
    const bundle = await this.bundleRepository.findOne({ where: { id } });
    if (!bundle) throw new NotFoundException('Bundle not found');
    if (bundle.user_id !== userId) throw new ForbiddenException('Access denied');
    return bundle;
  }

  async update(id: number, userId: number, updateBundleDto: UpdateBundleDto) {
    const bundle = await this.findOne(id, userId);
    this.bundleRepository.merge(bundle, updateBundleDto);
    return this.bundleRepository.save(bundle);
  }

  async remove(id: number, userId: number) {
    const result = await this.bundleRepository.delete({ id, user_id: userId });
    if (result.affected === 0) {
      throw new NotFoundException('Bundle not found or access denied');
    }
    return result;
  }

  async search(keyword: string) {
    const bundles = await this.bundleRepository.find({
      where: {
        title: Like(`%${keyword}%`),
        is_public: true,
      },
      relations: ['user'],
      select: {
        user: {
          id: true,
          nickname: true,
        }
      }
    });
    return bundles.map(b => this.maskBundle(b));
  }

  async findPublicByUser(targetUserId: number) {
    const bundles = await this.bundleRepository.find({
      where: {
        user_id: targetUserId,
        is_public: true,
      },
      relations: ['user'],
      select: {
        user: {
          id: true,
          nickname: true,
        }
      }
    });
    return bundles.map(b => this.maskBundle(b));
  }

  private maskBundle(bundle: Bundle) {
    // Hide sensitive data
    const { code, memo, ...rest } = bundle;
    return rest;
  }
}
