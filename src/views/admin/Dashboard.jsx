import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Tabs, Tab, Typography, Card, CardContent, Button, Modal, TextField, IconButton, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Products from './Products';
import Users from './Users';
import { Plus, Edit, Trash2, ImagePlus, X, Save } from 'lucide-react';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AdminDashboard = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [banners, setBanners] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fallbackBanners = [
        {
            id: 1,
            src: "/src/assets/mico1.png",
            title: "Tu tienda de confianza",
            description: "Compra rápido y con estilo"
        },
        {
            id: 2,
            src: "/src/assets/mico2.png",
            title: "Promoción Especial 2",
            description: "Descuentos limitados para ti"
        },
        {
            id: 3,
            src: "/src/assets/mico3.png",
            title: "Promoción Especial 3",
            description: "Lo mejor en personalización"
        },
        {
            id: 4,
            src: "/src/assets/mico4.png",
            title: "Promoción Especial 4",
            description: "No te lo pierdas"
        },
    ];

    React.useEffect(() => {
        setLoading(true);
        fetch('/api/banners')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBanners(data);
                } else if (Array.isArray(data.banners)) {
                    setBanners(data.banners);
                } else {
                    console.warn('Formato inesperado, usando datos por defecto.');
                    setBanners(fallbackBanners);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error cargando banners', err);
                setBanners(fallbackBanners);
                setLoading(false);
            });
    }, []);

    const [openModal, setOpenModal] = React.useState(false);
    const [editingBanner, setEditingBanner] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deletingBanner, setDeletingBanner] = React.useState(null);
    const [formValues, setFormValues] = React.useState({
        title: '',
        description: '',
        src: '',
    });
    const [selectedFile, setSelectedFile] = React.useState(null);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(banners);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);
        setBanners(items);
    };

    const handleOpenModal = (banner = null) => {
        if (banner) {
            setEditingBanner(banner);
            setFormValues({
                title: banner.title || '',
                description: banner.description || '',
                src: banner.src || '',
            });
            setSelectedFile(null);
        } else {
            setEditingBanner(null);
            setFormValues({ title: '', description: '', src: '' });
            setSelectedFile(null);
        }
        setOpenModal(true);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFormValues(prev => ({ ...prev, src: URL.createObjectURL(file) }));
        }
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingBanner(null);
        setFormValues({ title: '', description: '', src: '' });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveBanner = () => {
        if (editingBanner) {
            // Actualizar banner existente
            const updatedBanners = banners.map(b => b.id === editingBanner.id ? { ...b, ...formValues } : b);
            setBanners(updatedBanners);
            console.log('Editar banner:', editingBanner.id, formValues);
            // Aquí iría la llamada a la API para actualizar banner
        } else {
            // Crear nuevo banner
            const newBanner = {
                id: Date.now(), // Id temporal
                ...formValues,
            };
            setBanners(prev => [...prev, newBanner]);
            console.log('Crear nuevo banner:', formValues);
            // Aquí iría la llamada a la API para crear banner
        }
        handleCloseModal();
    };

    const handleOpenDeleteDialog = (banner) => {
        setDeletingBanner(banner);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeletingBanner(null);
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        if (deletingBanner) {
            const updatedBanners = banners.filter(b => b.id !== deletingBanner.id);
            setBanners(updatedBanners);
            console.log('Eliminar banner:', deletingBanner.id);
            // Aquí iría la llamada a la API para eliminar banner
        }
        handleCloseDeleteDialog();
    };

    return (
        <Card sx={{ maxWidth: '100%', mt: 2, color: 'black' }}>
            <CardContent>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label="admin tabs"
                >
                    <Tab label="Dashboard" />
                    <Tab label="Productos" />
                    <Tab label="Usuarios" />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 260 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Box>
                                <Typography variant="h6" color="black">Banner principal</Typography>
                                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                  Arrastra para reordenar los banners en la página principal
                                </Typography>
                              </Box>
                              <Button
                                variant="contained"
                                color="inherit"
                                size="small"
                                onClick={() => handleOpenModal(null)}
                              >
                                <Plus size={16} style={{ marginRight: 6 }} />
                                Crear nuevo banner
                              </Button>
                            </Box>
                            <Box mt={3}>
                                {banners.length === 0 ? (
                                    <Typography color="text.secondary">No hay ofertas cargadas.</Typography>
                                ) : (
                                    <DragDropContext onDragEnd={handleDragEnd}>
                                        <Droppable droppableId="banners">
                                            {(provided) => (
                                                <Box ref={provided.innerRef} {...provided.droppableProps}>
                                                    {banners.map((banner, index) => (
                                                        <Draggable key={banner.id} draggableId={banner.id.toString()} index={index}>
                                                            {(provided) => (
                                                                <Box
                                                                  ref={provided.innerRef}
                                                                  {...provided.draggableProps}
                                                                  {...provided.dragHandleProps}
                                                                  sx={{
                                                                    mb: 2,
                                                                    p: 2,
                                                                    border: '1px solid #ccc',
                                                                    borderRadius: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    bgcolor: '#fafafa',
                                                                    position: 'relative'
                                                                  }}
                                                                >
                                                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                    <Typography variant="h6" sx={{ mr: 2, ml: 2 }}>{index + 1}</Typography>
                                                                    <Box
                                                                      sx={{
                                                                        width: 110,
                                                                        height: 110,
                                                                        boxShadow: 1,
                                                                        borderRadius: 2,
                                                                        overflow: 'hidden',
                                                                        flexShrink: 0,
                                                                        backgroundColor: 'white'
                                                                      }}
                                                                    >
                                                                      <Box
                                                                        component="img"
                                                                        src={banner.src}
                                                                        alt={banner.title}
                                                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                      />
                                                                    </Box>
                                                                    <Box>
                                                                      <Typography variant="subtitle1" color="me referia text.primary" sx={{ fontWeight: 'bold' }}>
                                                                        Título: {banner.title}
                                                                      </Typography>
                                                                      <Typography variant="body2" color="text.secondary">
                                                                        Descripción: {banner.description}
                                                                      </Typography>
                                                                    </Box>
                                                                  </Box>
                                                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Button variant="outlined" color="inherit" size="small" disableElevation onClick={() => handleOpenModal(banner)}>
                                                                      <Edit size={16} style={{ marginRight: 6 }} />
                                                                      Editar
                                                                    </Button>
                                                                    <Button variant="contained" color="error" size="small" disableElevation onClick={() => handleOpenDeleteDialog(banner)}>
                                                                      <Trash2 size={16} style={{ marginRight: 6 }} />
                                                                      Eliminar
                                                                    </Button>
                                                                    <DragIndicatorIcon sx={{ color: '#999' }} />
                                                                  </Box>
                                                                </Box>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </Box>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                )}
                            </Box>
                        </>
                    )}

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 5,
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography
                                  id="modal-title"
                                  variant="h6"
                                  component="h2"
                                  color="black"
                                  sx={{ fontWeight: '500' }}
                                >
                                    {editingBanner ? 'Editar Banner' : 'Crear Banner'}
                                </Typography>
                                <IconButton onClick={handleCloseModal}>
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <TextField
                                label="Título"
                                name="title"
                                value={formValues.title}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: '#000' } }}
                                sx={{ input: { color: 'text.primary' } }}
                            />
                            <TextField
                                label="Descripción"
                                name="description"
                                value={formValues.description}
                                onChange={handleFormChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                InputLabelProps={{ style: { color: '#666' } }}
                                sx={{ input: { color: 'text.secondary' } }}
                            />
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <Button
                              variant="contained"
                              color="inherit"
                              startIcon={<ImagePlus size={16} />}
                              onClick={handleUploadClick}
                              sx={{ mt: 1.5, mb: 1, color: 'black' }}
                              disableElevation
                              size="small"
                            >
                              {editingBanner ? 'Editar imagen' : 'Subir imagen'}
                            </Button>
                            {formValues.src && (
                              <Box
                                mt={2}
                                sx={{
                                  textAlign: 'center',
                                  width: '100%',
                                  maxHeight: 180,
                                  overflow: 'hidden',
                                  borderRadius: 2,
                                  boxShadow: 2,
                                  bgcolor: 'background.default',
                                }}
                              >
                                <Box
                                  component="img"
                                  src={formValues.src}
                                  alt="preview"
                                  sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                />
                              </Box>
                            )}
                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                              <Button
                                onClick={handleCloseModal}
                                color="inherit"
                                startIcon={<X size={16} />}
                                variant="outlined"
                                disableElevation
                                sx={{ color: 'black' }}
                                size="small"
                              >
                                Cancelar
                              </Button>
                              <Button
                                variant="contained"
                                onClick={handleSaveBanner}
                                startIcon={<Save size={16} />}
                                disableElevation
                                color="secondary"
                                size="small"
                              >
                                {editingBanner ? 'Guardar' : 'Crear'}
                              </Button>
                            </Box>
                        </Box>
                    </Modal>

                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
                        <DialogContent>
                            <Typography>¿Estás seguro de que quieres eliminar este banner?</Typography>
                            {deletingBanner && (
                                <Box mt={2}>
                                    <Typography><strong>Título:</strong> {deletingBanner.title}</Typography>
                                    <Typography><strong>Descripción:</strong> {deletingBanner.description}</Typography>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseDeleteDialog}
                                variant="outlined"
                                color="inherit"
                                disableElevation
                                size="small"
                                sx={{ color: 'black' }}
                                startIcon={<X size={16} />}
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                variant="contained"
                                color="error"
                                disableElevation
                                size="small"
                                autoFocus
                            >
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Products />
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <Users />
                </TabPanel>
            </CardContent>
        </Card>
    );
};

export default AdminDashboard;