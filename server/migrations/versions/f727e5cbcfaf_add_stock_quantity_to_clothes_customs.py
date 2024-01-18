"""add stock, quantity to clothes, customs

Revision ID: f727e5cbcfaf
Revises: 602314e2881c
Create Date: 2024-01-17 17:33:34.739360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f727e5cbcfaf'
down_revision = '602314e2881c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clothings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stock', sa.Integer(), nullable=True))

    with op.batch_alter_table('customs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customs', schema=None) as batch_op:
        batch_op.drop_column('quantity')

    with op.batch_alter_table('clothings', schema=None) as batch_op:
        batch_op.drop_column('stock')

    # ### end Alembic commands ###