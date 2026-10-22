import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: "List pharmacy orders" })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Submit pharmacy order (Cash on Delivery)" })
  async create(@Body() body: any) {
    return { status: "received", data: body };
  }
}
