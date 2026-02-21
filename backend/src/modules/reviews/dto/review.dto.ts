import { IsInt, IsString, Min, Max, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Note de 1 à 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Excellent produit' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Vraiment convaincu par ce produit...' })
  @IsString()
  @MinLength(10)
  comment: string;
}
