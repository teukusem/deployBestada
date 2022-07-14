import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

function FormKeluhan() {
  document.title = `ZidDesk | Form Keluhan`;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: "",
    title: "",
    category: "",
    description: "",
  });

  const { image, title, category, description } = form;

  const useMutationSubmit = useMutation(
    ["submitCache"],
    async ({ image, title, category, description }) => {
      const response = await axios.post(
        `http://34.101.70.83:5200/mobile/user/v1/ticket/`,
        {
          image,
          title,
          category,
          description,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "l!nt@h-B@!k",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: async (data) => {
        navigate("/form-berhasil");
      },
      onError: (err) => {
        navigate("/form-gagal");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    useMutationSubmit.mutate(form);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.id === "file" ? e.target.files[0] : e.target.value,
    });
  };

  return (
    <>
      <Container className="d-flex mt-2">
        <BsArrowLeftShort size={30} onClick={() => navigate("/")} />
        <h5 className="fw-bold ms-2">Lapor Keluhan</h5>
      </Container>
      <Container>
        <Form className="mt-2" onSubmit={(e) => handleSubmit(e)}>
          <Form.Label className="fw-bold">Foto Keluhan</Form.Label>
          <Form.Group className="mb-3">
            {image.length < 1 ? (
              <>
                <input
                  accept="image/*"
                  onChange={handleChange}
                  type="file"
                  name="image"
                  value={form.image}
                  id="file"
                  className="inputfile"
                />
                <label for="file">Choose a file</label>
              </>
            ) : (
              <img
                style={{ maxWidth: "100%" }}
                src={URL.createObjectURL(image)}
                alt="your image"
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Apa Keluhanmu ?</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              placeholder="Judul Keluhan"
              name="title"
              value={title}
            />
          </Form.Group>

          <Form.Label className="fw-bold">Kategori Keluhan</Form.Label>
          <Form.Select
            onChange={handleChange}
            className="mb-3"
            style={{ width: "100%" }}
            value={category}
            name="category"
          >
            <option>Pilih Kategori</option>
            <option value="komputer&laptop">Komputer dan Laptop</option>
            <option value="cctv">CCTV</option>
            <option value="ac">AC</option>
          </Form.Select>

          <Form.Label className="fw-bold">Deskripsikan Keluhanmu</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={description}
            name="description"
            as="textarea"
            placeholder="Deskripsi Keluhan"
            style={{ height: "150px" }}
          />
          <div className="d-grid mt-3">
            <Button variant="primary" size="lg" type="submit">
              Kirim
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default FormKeluhan;
