import React, { useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Batches.css';

const rows = [
  {
    title: 'SQL Basics To Advanced Mastery Course',
    startDate: '20 Jul 2024',
    endDate: '28 Jul 2024',
    price: '₹ 0',
    validity: '180 days',
    status: 'Published',
    imageUrl: '/images/sql.jpg',
  },
  {
    title: '30 Days Of Javascript Challenge',
    startDate: '13 Jul 2024',
    endDate: '12 Aug 2024',
    price: '₹ 0',
    validity: '33 days',
    status: 'Unpublished',
    imageUrl: '/images/30.jpg',
  },
  {
    title: 'Interview Preparation With Javascript 2.0',
    startDate: '02 Aug 2024',
    endDate: '15 Sep 2024',
    price: '₹ 10,000',
    validity: '365 days',
    status: 'Published',
    imageUrl: '/images/dsa.jpg',
  },
];

const Batches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRows(
      rows.filter((row) =>
        row.title.toLowerCase().includes(query)
      )
    );
  };

  return (
    <Box className="container">
      <h2>Batches</h2>
      <p>Create learner's batch and share information at the same time.</p>
      <div className="searchBar">
        <SearchIcon />
        <TextField
          className="searchInput"
          variant="outlined"
          size="small"
          placeholder="Search by Title (alt+k or cmd+k)"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Validity/Expiry</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.title}>
                <TableCell className="tableCell">
                  <div className="titleText">
                    <img src={row.imageUrl} alt={row.title} className="titleImage" />
                    {row.title}
                  </div>
                </TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.validity}</TableCell>
                <TableCell>
                  <span className={row.status === 'Published' ? 'published' : 'unpublished'}>
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="rowsPerPage">
        <label>Rows per page:</label>
        <Select value={10}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </div>
    </Box>
  );
};

export default Batches;
