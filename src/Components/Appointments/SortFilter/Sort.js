import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import addImg from "../../../images/add.svg";
import deleteImg from "../../../images/deleteSort.svg";
import "./Sort.scss";

function Sort(props) {
  const [elemSort, setElemSort] = useState("");
  const [dir, setDir] = useState(false);
  const [filter, setFilter] = useState(true);
  
  const { 
    appointments, 
    directSort, 
    setDirectSort, 
    sortApp 
  } = props;

  const rangeSort = [
    { key: "name", value: "Имя" },
    { key: "doctor", value: "Врач" },
    { key: "date", value: "Дата" },
    { key: "_id", value: "None" },
  ];

  let direction = [
    {
      key: "asc",
      value: "По возрастанию",
    },
    {
      key: "desc",
      value: "По убыванию",
    },
  ];

  const sortFunc = (e) => {
    setElemSort(e.target.value);
    if (e.target.value === "_id") {
      setDir(false);
      let arr = sortApp(appointments, e.target.value, "asc");
      props.setHowSort(e.target.value);
      props.setAppointment(arr);
    } else {
      setDir(true);
      let arr = sortApp(appointments, e.target.value, directSort);
      props.setHowSort(e.target.value);
      props.setAppointment(arr);
    }
  };

  const directFunc = (e) => {
    setDirectSort(e.target.value);
    let arr = sortApp(appointments, props.howSort, e.target.value);
    props.setAppointment(arr);
  };

  const onDeleteFilter = (dateFromDel, dateByDel) => {
    props.setDateFrom("");
    props.setDateBy("");
    setFilter(true);
    props.getAllAppoints("", "");
  };

  const onFilterThis = () => {
    props.getAllAppoints(props.dateFrom, props.dateBy);
  };

  return (
    <Container fixed>
      <div className="Sort">
        <div className="Sort_block">
          <Typography className="Sort-text">Сортировать по:</Typography>
          <TextField
            id="sortInput"
            select
            value={elemSort}
            onChange={(e) => sortFunc(e)}
            variant="outlined"
          >
            {rangeSort.map((item, index) => (
              <MenuItem key={`sorting-item-${index}`} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {dir && (
          <div className="Sort_direct">
            <Typography className="Sort-text">Направление:</Typography>
            <TextField
              id="directInput"
              select
              value={directSort}
              onChange={(e) => directFunc(e)}
              variant="outlined"
            >
              {direction.map((item, index) => (
                <MenuItem key={`sorting-type-item-${index}`} value={item.key}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}

        {filter && (
          <div className="filter">
            <Typography className="Sort-text">
              Добавить фильтр по дате:
            </Typography>
            <img
              src={addImg}
              className="filter_img"
              alt="addImg"
              onClick={() => setFilter(false)}
            />
          </div>
        )}
      </div>
      {!filter && (
        <div className="filter-date">
          <div className="filter-date_from">
            <Typography className="filter-date_text">с:</Typography>
            <TextField
              type="date"
              id="dateInput"
              value={props.dateFrom}
              variant="outlined"
              onChange={(e) => props.setDateFrom(e.target.value)}
            />
          </div>
          <div className="filter-date_from">
            <Typography className="filter-date_text">по:</Typography>
            <TextField
              type="date"
              id="dateInput"
              value={props.dateBy}
              variant="outlined"
              onChange={(e) => props.setDateBy(e.target.value)}
            />
          </div>
          <div className="filter-btn_block">
            <Button
              id="filter-btn"
              variant="contained"
              onClick={() => onFilterThis()}
            >
              Фильтровать
            </Button>
            <img
              src={deleteImg}
              className="filter_img"
              alt="deleteImg"
              onClick={() => onDeleteFilter()}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Sort;
