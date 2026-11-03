

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESING = "PROCESING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export const OrderStatusList = [
  OrderStatus.PENDING,
  OrderStatus.PROCESING,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELED,
];