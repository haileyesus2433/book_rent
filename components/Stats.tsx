"use client";
import { Box, Chip, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

interface IncomeProps {
  amount: number;
  currency: string;
  percentage: number;
  lastMonth: number;
}

interface BookCategory {
  label: string;
  value: number;
  color: string;
}

interface StatisticsProps {
  income: IncomeProps;
  bookCategories: BookCategory[];
}

const Statistics: React.FC<StatisticsProps> = ({ income, bookCategories }) => {
  return (
    <>
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Income
        </Typography>
        <Typography variant="h4" component="p" gutterBottom>
          {income.currency} {income.amount.toFixed(2)}
          <Chip
            label={`${income.percentage > 0 ? '+' : ''}${income.percentage}%`}
            color={income.percentage > 0 ? 'success' : 'error'}
            size="small"
            sx={{ ml: 1, verticalAlign: 'middle' }}
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Compared to {income.currency}{income.lastMonth} last month
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Available Books
        </Typography>
        <PieChart
          series={[
            {
              data: bookCategories.map(category => ({
                id: category.label,
                value: category.value,
                label: category.label,
                color: category.color,
              })),
            },
          ]}
          width={300}
          height={200}
        />
        <Box mt={2}>
          {bookCategories.map((category) => (
            <Box key={category.label} display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">{category.label}</Typography>
              <Typography variant="body2" fontWeight="bold">
                {category.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Statistics;
