import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  milage: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id) //достаем только id пользователя
  @Expose()
  userId: number;
}
