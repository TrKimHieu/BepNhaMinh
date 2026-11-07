# Terraform — AWS

Chưa viết code hạ tầng. Đây là danh sách những gì cần tạo, theo thứ tự:

| File | Nội dung |
|---|---|
| `main.tf` | provider `aws`, backend state (S3 + DynamoDB lock) |
| `variables.tf` | `region`, `project`, `instance_type`, `domain` |
| `ec2.tf` | EC2 t3.small, security group (22 từ IP văn phòng, 80/443 từ 0.0.0.0/0), Elastic IP |
| `s3.tf` | bucket ảnh món ăn, block public access, CORS cho app mobile |
| `iam.tf` | instance role: quyền tối thiểu `s3:PutObject` + `s3:GetObject` trên bucket ảnh |
| `rds.tf` | *(tùy chọn)* RDS thay cho container postgres — đổi thì sửa `DATABASE_URL` |

## Lệnh

```bash
cd infrastructure/aws/terraform
terraform init
terraform plan  -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

> `terraform.tfvars` và `*.tfstate` đã nằm trong `.gitignore`. Không commit state.
