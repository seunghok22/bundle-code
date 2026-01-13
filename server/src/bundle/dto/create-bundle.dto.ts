import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateBundleDto {
    @IsString()
    title: string;

    @IsString()
    code: string;

    @IsString()
    platform: string;

    @IsDateString()
    @IsOptional()
    purchased_at?: string;

    @IsDateString()
    @IsOptional()
    expires_at?: string;

    @IsString()
    @IsOptional()
    source?: string;

    @IsString()
    @IsOptional()
    price?: string;

    @IsString()
    @IsOptional()
    memo?: string;

    @IsBoolean()
    @IsOptional()
    is_public?: boolean;
}
