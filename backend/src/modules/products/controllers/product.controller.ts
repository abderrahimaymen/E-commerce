import 'multer';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
  UploadedFile,
  UseInterceptors,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto, UpdateStockDto } from '../dto/product.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../domain/enums';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des produits avec pagination, recherche et filtres' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'search', type: String, required: false, description: 'Recherche par nom' })
  @ApiQuery({ name: 'category', type: String, required: false })
  @ApiQuery({ name: 'minPrice', type: Number, required: false })
  @ApiQuery({ name: 'maxPrice', type: Number, required: false })
  @ApiQuery({ name: 'sortBy', enum: ['price_asc', 'price_desc', 'newest', 'name'], required: false })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
  ) {
    return this.productService.findAll(page, limit, { search, category, minPrice, maxPrice, sortBy });
  }

  @Get('categories')
  @ApiOperation({ summary: 'Liste des catégories disponibles' })
  getCategories() {
    return this.productService.getCategories();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tous les produits (y compris inactifs)' })
  findAllAdmin(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.productService.findAllAdmin(page, limit);
  }

  @Get('admin/export-csv')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Exporter les produits en CSV' })
  async exportCsv(@Res() res: Response) {
    const csv = await this.productService.exportToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.send(csv);
  }

  @Post('admin/import-csv')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '[Admin] Import en masse via CSV' })
  async importCsv(@UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.productService.importFromCsv(file.buffer.toString());
  }

  @Post('admin/import-json')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '[Admin] Import en masse via JSON' })
  async importJson(@UploadedFile() file: { buffer: Buffer; originalname: string; mimetype: string }) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.productService.importFromJson(file.buffer.toString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un produit' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un produit (Admin uniquement)' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un produit (Admin uniquement)' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ajuster le stock (Admin uniquement)' })
  updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.productService.updateStock(id, updateStockDto.delta);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un produit (Admin uniquement)' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
