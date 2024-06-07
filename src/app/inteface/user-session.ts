/**
 * Modified @author Rizkia04
 * 12 July 2023
 * UserSession Master Item Kategori
 */
export interface UserSession {
  id: number;
  userId: string;
  nik: number; // NIK
  name: string; // NAME
  position_name: string; // POSITION_NAME
  group_position: string; // GROUP POSITION
  ouCode: string; // OU_CODE
  department: string; // DEPARTMENT
}
